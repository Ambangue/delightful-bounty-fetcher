import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type Order = Database['public']['Tables']['orders']['Row'] & {
  order_items: Database['public']['Tables']['order_items']['Row'][];
};

type TrackingData = Database['public']['Tables']['delivery_tracking']['Row'];

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1iYW5ndWUtZ2VuIiwiYSI6ImNtNW1xMXZ1MDAyemoyanNndW54cWlzMGIifQ.LQWgidrul6GN54MJhmaOpg';

const OrderTracking = () => {
  const { id } = useParams();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [tracking, setTracking] = useState<TrackingData | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        toast.error("Erreur lors du chargement de la commande");
        return;
      }

      setOrder(data as Order);
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [2.3522, 48.8566], // Default to Paris
      zoom: 13
    });

    marker.current = new mapboxgl.Marker()
      .setLngLat([2.3522, 48.8566])
      .addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('tracking-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'delivery_tracking',
          filter: `order_id=eq.${id}`
        },
        (payload) => {
          const newTracking = payload.new as TrackingData;
          setTracking(newTracking);
          
          if (newTracking.latitude && newTracking.longitude && marker.current && map.current) {
            marker.current.setLngLat([newTracking.longitude, newTracking.latitude]);
            map.current.flyTo({
              center: [newTracking.longitude, newTracking.latitude],
              zoom: 15
            });
          }
          
          toast.success(`Statut de la commande: ${newTracking.status}`);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  if (!order) return <div>Chargement...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Suivi de commande #{id}</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Détails de la commande</h2>
            <div className="space-y-4">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.item_name} x{item.quantity}</span>
                  <span>{item.price * item.quantity} FCFA</span>
                </div>
              ))}
              <div className="border-t pt-4 font-bold flex justify-between">
                <span>Total</span>
                <span>{order.total_amount} FCFA</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Statut</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${tracking?.status === 'preparing' ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                <span>Préparation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${tracking?.status === 'picked_up' ? 'bg-blue-500' : 'bg-gray-300'}`} />
                <span>En route</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${tracking?.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span>Livré</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div ref={mapContainer} className="w-full h-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;