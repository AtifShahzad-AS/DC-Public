import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendurl } from '../App'
import { toast } from 'react-toastify'

const DeliverySettings = ({ token }) => {
  const [deliveryFee, setDeliveryFee] = useState('')
  const [freeDeliveryAbove, setFreeDeliveryAbove] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.post(backendurl + '/api/settings/get')
        if (data.success) {
          setDeliveryFee(data.settings.deliveryFee ?? 200)
          setFreeDeliveryAbove(data.settings.freeDeliveryAbove ?? 3000)
        }
      } catch (err) {
        console.error("Error fetching delivery settings:", err)
      } finally {
        setFetching(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSave = async () => {
    if (!deliveryFee || !freeDeliveryAbove) return toast.error('Both fields are required')
    if (Number(freeDeliveryAbove) <= Number(deliveryFee)) {
      return toast.error('Free delivery threshold must be greater than delivery fee')
    }

    setLoading(true)
    try {
      const { data } = await axios.post(
        backendurl + '/api/settings/delivery',
        { deliveryFee, freeDeliveryAbove },
        { headers: { token } }
      )
      if (data.success) {
        toast.success('Delivery settings saved')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return (
    <div className="bg-white rounded-xl border border-black/5 p-5">
      <div className="w-5 h-5 border-2 border-[#e8a87c] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="bg-white rounded-xl border border-black/5 p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#1a1a2e]">Delivery Settings</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Set the delivery fee and free delivery threshold
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-[11px] text-gray-500 font-medium mb-1 block">
            Delivery Fee (Rs)
          </label>
          <input
            type="number"
            min="0"
            value={deliveryFee}
            onChange={e => setDeliveryFee(e.target.value)}
            placeholder="e.g. 200"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50"
          />
          <p className="text-[10px] text-gray-400 mt-1">Charged for low-value orders</p>
        </div>

        <div>
          <label className="text-[11px] text-gray-500 font-medium mb-1 block">
            Free Delivery Above (Rs)
          </label>
          <input
            type="number"
            min="0"
            value={freeDeliveryAbove}
            onChange={e => setFreeDeliveryAbove(e.target.value)}
            placeholder="e.g. 3000"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#e8a87c] bg-gray-50"
          />
          <p className="text-[10px] text-gray-400 mt-1">Threshold for free shipping</p>
        </div>
      </div>

      <div className="bg-[#fff4e5] rounded-lg px-4 py-3 mb-4 text-xs text-[#b36b00]">
        Orders under <strong>Rs {Number(freeDeliveryAbove).toLocaleString()}</strong>
        {' '}→ fee <strong>Rs {Number(deliveryFee).toLocaleString()}</strong>
        {' · '}
        Above → <strong>Free delivery</strong>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-[#1a1a2e] text-white text-xs font-medium px-5 py-2.5 rounded-lg hover:bg-[#2a2a3e] transition-colors disabled:opacity-60"
      >
        {loading ? 'Saving...' : 'Save Delivery Settings'}
      </button>
    </div>
  )
}

export default DeliverySettings