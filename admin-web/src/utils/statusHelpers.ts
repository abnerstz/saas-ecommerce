import { AlertCircle, CheckCircle, Package, Truck, XCircle } from 'lucide-react'
import { ORDER_STATUS_LABELS } from './constants'

export type OrderStatusKey = keyof typeof ORDER_STATUS_LABELS

export type BadgeVariant = 'default' | 'destructive' | 'outline' | 'secondary'

export function getOrderStatusLabel(status: string): string {
  return ORDER_STATUS_LABELS[status as OrderStatusKey] ?? status
}

export function getOrderStatusBadgeVariant(status: string): BadgeVariant {
  const variants: Record<string, BadgeVariant> = {
    delivered: 'default',
    shipped: 'secondary',
    processing: 'outline',
    confirmed: 'outline',
    pending: 'outline',
    cancelled: 'destructive',
    refunded: 'destructive'
  }
  return variants[status] ?? 'outline'
}

export interface OrderPipelineStatusConfig {
  color: string
  icon: typeof AlertCircle
  label: string
}

const ORDER_PIPELINE_CONFIG: Record<string, OrderPipelineStatusConfig> = {
  pending: { color: 'bg-orange-500', icon: AlertCircle, label: ORDER_STATUS_LABELS.pending },
  confirmed: { color: 'bg-blue-500', icon: CheckCircle, label: ORDER_STATUS_LABELS.confirmed },
  processing: { color: 'bg-purple-500', icon: Package, label: ORDER_STATUS_LABELS.processing },
  shipped: { color: 'bg-indigo-500', icon: Truck, label: ORDER_STATUS_LABELS.shipped },
  delivered: { color: 'bg-green-500', icon: CheckCircle, label: ORDER_STATUS_LABELS.delivered },
  cancelled: { color: 'bg-red-500', icon: XCircle, label: ORDER_STATUS_LABELS.cancelled },
  refunded: { color: 'bg-amber-500', icon: XCircle, label: ORDER_STATUS_LABELS.refunded }
}

export function getOrderPipelineStatusConfig(status: string): OrderPipelineStatusConfig {
  return (
    ORDER_PIPELINE_CONFIG[status] ?? {
      color: 'bg-gray-500',
      icon: AlertCircle,
      label: status
    }
  )
}

export interface OrderTimelineStep {
  status: string
  label: string
  completed: boolean
}

const ORDER_TIMELINE_STEP_LABELS: Record<string, string> = {
  pending: 'Pedido Recebido',
  confirmed: 'Pagamento Confirmado',
  processing: 'Em Processamento',
  shipped: 'Enviado',
  delivered: 'Entregue'
}

export function getOrderTimelineSteps(currentStatus: string): OrderTimelineStep[] {
  const statusOrder: string[] = [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered'
  ]
  const completedWhen: Record<string, string[]> = {
    pending: ['pending', 'confirmed', 'processing', 'shipped', 'delivered'],
    confirmed: ['confirmed', 'processing', 'shipped', 'delivered'],
    processing: ['processing', 'shipped', 'delivered'],
    shipped: ['shipped', 'delivered'],
    delivered: ['delivered']
  }

  return statusOrder.map((status) => ({
    status,
    label: ORDER_TIMELINE_STEP_LABELS[status] ?? ORDER_STATUS_LABELS[status as OrderStatusKey],
    completed: completedWhen[status]?.includes(currentStatus) ?? false
  }))
}

export const PRODUCT_STATUS_LABELS: Record<string, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
  draft: 'Rascunho',
  archived: 'Arquivado'
}

export function getProductStatusLabel(status: string): string {
  return PRODUCT_STATUS_LABELS[status] ?? status
}
