export interface Rider {
  id: string
  name: string
  phone: string
  latitude: number
  longitude: number
  rating: number
  tier: 'BRONZE' | 'SILVER' | 'GOLD'
  isAvailable: boolean
}

export interface Order {
  id: string
  pickupLat: number
  pickupLng: number
  dropoffLat: number
  dropoffLng: number
  status?: string
  riderId?: string
}