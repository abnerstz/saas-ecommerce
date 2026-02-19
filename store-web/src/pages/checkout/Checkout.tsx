import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Card, CardContent, Input, Label } from '@/components/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { RadioGroup, RadioGroupItem } from '@/components/ui'
import { useCartStore } from '@/stores/cartStore'
import { useCreateOrder } from '@/api/hooks/orders'

const schema = z.object({
  firstName: z.string().min(1, 'Nome é obrigatório'),
  lastName: z.string().min(1, 'Sobrenome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  deliveryType: z.enum(['delivery', 'pickup']),
  paymentMethod: z.string().min(1, 'Escolha a forma de pagamento'),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
}).refine((data) => {
  if (data.deliveryType === 'delivery') {
    return data.street && data.number && data.neighborhood && data.city && data.state && data.zipCode
  }
  return true
}, { message: 'Preencha o endereço de entrega', path: ['street'] })

type FormData = z.infer<typeof schema>

const PAYMENT_OPTIONS = [
  { value: 'pix', label: 'PIX' },
  { value: 'credit_card', label: 'Cartão de crédito' },
  { value: 'debit_card', label: 'Cartão de débito' },
  { value: 'cash', label: 'Dinheiro' },
]

export default function Checkout() {
  const navigate = useNavigate()
  const { items, clear } = useCartStore()
  const createOrder = useCreateOrder()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      deliveryType: 'pickup',
      paymentMethod: '',
      country: 'BR',
    },
  })

  const deliveryType = watch('deliveryType')

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) {
      navigate('/cart')
      return
    }

    const address = {
      street: data.street || 'Retirada no balcão',
      number: data.number || 'S/N',
      complement: data.complement,
      neighborhood: data.neighborhood || '-',
      city: data.city || '-',
      state: data.state || '-',
      zipCode: data.zipCode || '-',
      country: data.country || 'BR',
    }

    try {
      const order = await createOrder.mutateAsync({
        customer_info: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
        },
        billing_address: address,
        shipping_address: data.deliveryType === 'delivery' ? address : undefined,
        items: items.map((i) => ({ product_id: i.productId, quantity: i.quantity })),
        notes: data.notes,
        custom_attributes: {
          payment_method: data.paymentMethod,
          delivery_type: data.deliveryType,
        },
      })
      clear()
      const orderNumber = order?.order_number ?? order?.orderNumber ?? order?.id
      const email = data.email
      if (orderNumber && email) {
        try {
          const stored = JSON.parse(localStorage.getItem('store_orders') ?? '[]')
          stored.push({ order_number: orderNumber, email, order })
          localStorage.setItem('store_orders', JSON.stringify(stored.slice(-50)))
        } catch {
          // ignore
        }
      }
      navigate('/orders', { state: { orderNumber, email } })
    } catch {
      // erro tratado pelo mutation
    }
  }

  if (items.length === 0) {
    navigate('/cart', { replace: true })
    return null
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <>
      <Helmet>
        <title>Finalizar pedido - Loja de Bebidas</title>
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight mb-6">
          Finalizar pedido
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Dados para contato
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs font-normal">Nome</Label>
                  <Input id="firstName" {...register('firstName')} className="h-9" />
                  {errors.firstName && (
                    <p className="text-xs text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs font-normal">Sobrenome</Label>
                  <Input id="lastName" {...register('lastName')} className="h-9" />
                  {errors.lastName && (
                    <p className="text-xs text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-normal">E-mail</Label>
                <Input id="email" type="email" {...register('email')} className="h-9" />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-normal">Telefone</Label>
                <Input id="phone" {...register('phone')} className="h-9" placeholder="(11) 99999-9999" />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Como deseja receber?
              </h2>
              <RadioGroup
                value={deliveryType}
                onValueChange={(v) => setValue('deliveryType', v as 'delivery' | 'pickup')}
                className="flex gap-4"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="pickup" />
                  <span className="text-sm">Retirada no balcão</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="delivery" />
                  <span className="text-sm">Entrega</span>
                </label>
              </RadioGroup>

              {deliveryType === 'delivery' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="sm:col-span-2 space-y-2">
                    <Label className="text-xs font-normal">Endereço</Label>
                    <Input {...register('street')} className="h-9" placeholder="Rua, avenida" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-normal">Número</Label>
                    <Input {...register('number')} className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-normal">Complemento</Label>
                    <Input {...register('complement')} className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-normal">Bairro</Label>
                    <Input {...register('neighborhood')} className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-normal">Cidade</Label>
                    <Input {...register('city')} className="h-9" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-normal">Estado</Label>
                    <Input {...register('state')} className="h-9" placeholder="SP" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-normal">CEP</Label>
                    <Input {...register('zipCode')} className="h-9" placeholder="00000-000" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Forma de pagamento
              </h2>
              <p className="text-xs text-muted-foreground">
                Informe como pretende pagar. O pagamento será acertado na retirada ou com o entregador.
              </p>
              <div className="space-y-2">
                <Select value={watch('paymentMethod')} onValueChange={(v) => setValue('paymentMethod', v)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.paymentMethod && (
                  <p className="text-xs text-destructive">{errors.paymentMethod.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2">
              <Label htmlFor="notes" className="text-xs font-normal text-muted-foreground">
                Observações (opcional)
              </Label>
              <Input id="notes" {...register('notes')} className="h-9" placeholder="Ex: Horário preferido para entrega" />
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm font-semibold tabular-nums">
              Total: R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <Button type="submit" size="lg" disabled={createOrder.isPending}>
              {createOrder.isPending ? 'Enviando...' : 'Confirmar pedido'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
