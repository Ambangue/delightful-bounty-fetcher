import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface ReservationRequest {
  restaurantId: string
  date: string
  time: string
  guests: number
  name: string
  email: string
  phone: string
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { restaurantId, date, time, guests, name, email, phone } = await req.json() as ReservationRequest

    // Initialize Amelia client
    const ameliaKey = Deno.env.get('AMELIA_API_KEY')
    const ameliaResponse = await fetch('https://api.ameliabooking.com/api/v1/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': ameliaKey!
      },
      body: JSON.stringify({
        service: 'restaurant-reservation',
        datetime: `${date}T${time}`,
        customer: { name, email, phone },
        extras: { guests, restaurantId }
      })
    })

    if (!ameliaResponse.ok) {
      throw new Error('Failed to create reservation in Amelia')
    }

    const reservationData = await ameliaResponse.json()

    // Send SMS confirmation via Twilio
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID')
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN')
    
    await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${accountSid}:${authToken}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        To: phone,
        From: '+1234567890', // Replace with your Twilio number
        Body: `Your reservation at our restaurant for ${guests} guests on ${date} at ${time} is confirmed! Reservation ID: ${reservationData.id}`
      })
    })

    // Store reservation in Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        service_provider_id: restaurantId,
        user_id: null, // We'll add user association later if needed
        booking_type: 'restaurant',
        status: 'confirmed',
        start_time: `${date}T${time}`,
        special_requirements: {
          guests,
          customer: { name, email, phone }
        }
      })
      .select()
      .single()

    if (error) throw error

    return new Response(JSON.stringify({ 
      success: true,
      data: {
        booking: data,
        ameliaId: reservationData.id
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})