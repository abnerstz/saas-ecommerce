import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  RadioGroup,
  RadioGroupItem
} from '@ecommerce/ui'
import { Search, Plus, Minus, Trash2, ShoppingCart, User, MapPin, Truck, Store } from 'lucide-react'
import { products, customers, Product } from '../../utils/mockData'

interface ProductItem {
  id: string
  name: string
  price: number
  stock: number
  quantity: number
}

interface NewOrderData {
  customerName: string
  customerEmail: string
  customerPhone?: string
  isGuestCustomer: boolean
  deliveryType: 'local' | 'pickup' | 'delivery'
  deliveryAddress?: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    zipCode: string
  }
  items: ProductItem[]
  paymentMethod: string
  shippingAddress: string
  total: number
}

interface NewOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (order: NewOrderData) => void
}

export function NewOrderModal({ isOpen, onClose, onSave }: NewOrderModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [isGuestCustomer, setIsGuestCustomer] = useState(false)
  const [guestCustomerData, setGuestCustomerData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [deliveryType, setDeliveryType] = useState<'local' | 'pickup' | 'delivery'>('local')
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    zipCode: ''
  })
  const [selectedProducts, setSelectedProducts] = useState<ProductItem[]>([])
  const [showProductSearch, setShowProductSearch] = useState(false)
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    product.status === 'active' &&
    product.stock > 0 &&
    !selectedProducts.find(p => p.id === product.id)
  )

  const addProduct = (product: Product) => {
    const productItem: ProductItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      quantity: 1
    }
    setSelectedProducts([...selectedProducts, productItem])
    setSearchTerm('')
  }

  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return
    
    setSelectedProducts(selectedProducts.map(p => 
      p.id === productId 
        ? { ...p, quantity: Math.min(quantity, p.stock) }
        : p
    ))
  }

  const totalOrder = selectedProducts.reduce((sum, product) => 
    sum + (product.price * product.quantity), 0
  )

  const handleSubmit = () => {
    // Validação: deve ter produtos e dados do cliente (cadastrado ou avulso)
    if (selectedProducts.length === 0) return
    if (!isGuestCustomer && !selectedClient) return
    if (isGuestCustomer && !guestCustomerData.name.trim()) return
    if (deliveryType === 'delivery' && (!deliveryAddress.street.trim() || !deliveryAddress.number.trim())) return

    let customerData
    if (isGuestCustomer) {
      customerData = {
        name: guestCustomerData.name,
        email: guestCustomerData.email,
        phone: guestCustomerData.phone
      }
    } else {
      const customer = customers.find(c => c.id === selectedClient)
      customerData = {
        name: customer?.name || '',
        email: customer?.email || '',
        phone: customer?.phone || ''
      }
    }

    let shippingAddress = 'Não aplicável'
    if (deliveryType === 'delivery') {
      shippingAddress = `${deliveryAddress.street}, ${deliveryAddress.number}${deliveryAddress.complement ? `, ${deliveryAddress.complement}` : ''}, ${deliveryAddress.neighborhood}, ${deliveryAddress.city} - ${deliveryAddress.zipCode}`
    } else if (deliveryType === 'pickup') {
      shippingAddress = 'Retirada no local'
    } else {
      shippingAddress = 'Consumo no local'
    }

    const newOrderData: NewOrderData = {
      customerName: customerData.name,
      customerEmail: customerData.email,
      customerPhone: customerData.phone,
      isGuestCustomer,
      deliveryType,
      deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : undefined,
      items: selectedProducts,
      paymentMethod: 'Credit Card',
      shippingAddress,
      total: totalOrder
    }

    onSave(newOrderData)
    handleClose()
  }

  const handleClose = () => {
    setSelectedClient('')
    setIsGuestCustomer(false)
    setGuestCustomerData({ name: '', email: '', phone: '' })
    setDeliveryType('local')
    setDeliveryAddress({
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      zipCode: ''
    })
    setSelectedProducts([])
    setSearchTerm('')
    setShowProductSearch(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Novo Pedido
          </DialogTitle>
          <DialogDescription>
            Crie um novo pedido selecionando cliente e produtos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tipo de Cliente */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <User className="w-4 h-4 mr-2" />
                Dados do Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup 
                value={isGuestCustomer ? 'guest' : 'registered'} 
                onValueChange={(value: string) => {
                  setIsGuestCustomer(value === 'guest')
                  if (value === 'guest') {
                    setSelectedClient('')
                  } else {
                    setGuestCustomerData({ name: '', email: '', phone: '' })
                  }
                }}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="registered" id="registered" />
                  <Label htmlFor="registered">Cliente Cadastrado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="guest" id="guest" />
                  <Label htmlFor="guest">Cliente Avulso</Label>
                </div>
              </RadioGroup>

              {!isGuestCustomer ? (
                <div className="space-y-2">
                  <Label>Selecionar Cliente</Label>
                  <Select value={selectedClient} onValueChange={setSelectedClient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente cadastrado" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name} - {client.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guest-name">Nome *</Label>
                      <Input
                        id="guest-name"
                        placeholder="Nome do cliente"
                        value={guestCustomerData.name}
                        onChange={(e) => setGuestCustomerData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guest-phone">Telefone *</Label>
                      <Input
                        id="guest-phone"
                        placeholder="(00) 00000-0000"
                        value={guestCustomerData.phone}
                        onChange={(e) => setGuestCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guest-email">Email (opcional)</Label>
                    <Input
                      id="guest-email"
                      type="email"
                      placeholder="email@exemplo.com"
                      value={guestCustomerData.email}
                      onChange={(e) => setGuestCustomerData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tipo de Entrega */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Truck className="w-4 h-4 mr-2" />
                Tipo de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={deliveryType} onValueChange={(value: string) => setDeliveryType(value as 'local' | 'pickup' | 'delivery')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="local" id="local" />
                  <Label htmlFor="local" className="flex items-center">
                    <Store className="w-4 h-4 mr-2" />
                    Consumo no Local
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Retirada no Balcão
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery" className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Entrega
                  </Label>
                </div>
              </RadioGroup>

              {deliveryType === 'delivery' && (
                <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                  <Label className="text-sm font-medium mb-3 block">Endereço de Entrega</Label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="street">Rua/Avenida *</Label>
                        <Input
                          id="street"
                          placeholder="Nome da rua"
                          value={deliveryAddress.street}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, street: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="number">Número *</Label>
                        <Input
                          id="number"
                          placeholder="123"
                          value={deliveryAddress.number}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, number: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          placeholder="Apto, bloco, etc."
                          value={deliveryAddress.complement}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, complement: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input
                          id="neighborhood"
                          placeholder="Nome do bairro"
                          value={deliveryAddress.neighborhood}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, neighborhood: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          placeholder="Nome da cidade"
                          value={deliveryAddress.city}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">CEP *</Label>
                        <Input
                          id="zipCode"
                          placeholder="00000-000"
                          value={deliveryAddress.zipCode}
                          onChange={(e) => setDeliveryAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Produtos</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowProductSearch(!showProductSearch)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Produto
              </Button>
            </div>

            {/* Product Search */}
            {showProductSearch && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Buscar Produtos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Digite o nome do produto..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {searchTerm && (
                    <div className="max-h-48 overflow-y-auto border rounded">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Estoque</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProducts.map(product => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{product.stock}</Badge>
                              </TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  onClick={() => addProduct(product)}
                                >
                                  Adicionar
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                          {filteredProducts.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center text-muted-foreground">
                                Nenhum produto encontrado
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Selected Products */}
            {selectedProducts.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Produtos Selecionados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedProducts.map(product => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            R$ {product.price.toFixed(2)} • Estoque: {product.stock}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product.id, product.quantity - 1)}
                            disabled={product.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          
                          <span className="w-8 text-center text-sm font-medium">
                            {product.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product.id, product.quantity + 1)}
                            disabled={product.quantity >= product.stock}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          
                          <div className="w-20 text-right text-sm font-medium">
                            R$ {(product.price * product.quantity).toFixed(2)}
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProduct(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-between items-center pt-3 border-t font-semibold">
                      <span>Total do Pedido:</span>
                      <span>R$ {totalOrder.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={
              selectedProducts.length === 0 ||
              (!isGuestCustomer && !selectedClient) ||
              (isGuestCustomer && !guestCustomerData.name.trim()) ||
              (deliveryType === 'delivery' && (!deliveryAddress.street.trim() || !deliveryAddress.number.trim() || !deliveryAddress.neighborhood.trim() || !deliveryAddress.city.trim() || !deliveryAddress.zipCode.trim()))
            }
          >
            Criar Pedido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
