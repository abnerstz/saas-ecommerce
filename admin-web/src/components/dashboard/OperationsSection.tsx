import { Card, CardContent, CardHeader, CardTitle, Badge, Progress } from '@/components/ui'
import { Package, Truck, Heart, Calculator, Star } from 'lucide-react'

interface OperationsSectionProps {
  estoqueStatus: {
    outOfStock: number
    lowStock: number
    wellStocked: number
  }
  performanceEntrega: {
    onTime: number
    averageTime: number
  }
  customerSatisfaction: {
    averageRating: number
    totalReviews: number
  }
  financialSummary: {
    grossRevenue: number
    costs: number
    netProfit: number
  }
}

export function OperationsSection({ 
  estoqueStatus, 
  performanceEntrega, 
  customerSatisfaction, 
  financialSummary 
}: OperationsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Status do Estoque */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-base">
            <Package className="w-4 h-4 mr-2" />
            Status do Estoque
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Badge variant="destructive" className="text-xs mr-2">●</Badge>
                <span className="text-sm">Em Falta</span>
              </div>
              <span className="font-bold text-red-600">{estoqueStatus.outOfStock}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Badge className="bg-orange-500 text-xs mr-2">●</Badge>
                <span className="text-sm">Estoque Baixo</span>
              </div>
              <span className="font-bold text-orange-600">{estoqueStatus.lowStock}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Badge className="bg-green-500 text-xs mr-2">●</Badge>
                <span className="text-sm">Bem Abastecido</span>
              </div>
              <span className="font-bold text-green-600">{estoqueStatus.wellStocked}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance de Entrega */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-base">
            <Truck className="w-4 h-4 mr-2" />
            Performance de Entrega
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Entregas no Prazo</span>
                <span className="font-medium">{performanceEntrega.onTime}%</span>
              </div>
              <Progress 
                value={performanceEntrega.onTime} 
                className="h-2"
              />
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tempo Médio</span>
                <div className="text-right">
                  <div className="text-lg font-bold">{performanceEntrega.averageTime}</div>
                  <div className="text-xs text-muted-foreground">dias</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Satisfação do Cliente */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-base">
            <Heart className="w-4 h-4 mr-2" />
            Satisfação do Cliente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-foreground">
              {customerSatisfaction.averageRating}
            </div>
            <div className="flex justify-center items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.floor(customerSatisfaction.averageRating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : star <= customerSatisfaction.averageRating 
                        ? 'fill-yellow-200 text-yellow-400' 
                        : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              {customerSatisfaction.totalReviews.toLocaleString('pt-BR')} avaliações
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo Financeiro */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-base">
            <Calculator className="w-4 h-4 mr-2" />
            Resumo Financeiro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Vendas por Período</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">6 meses atrás</span>
                  <span className="font-medium text-green-600">
                    R$ 3.000
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">2 semanas atrás</span>
                  <span className="font-medium text-green-600">
                    R$ 1.200
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Última semana</span>
                  <span className="font-medium text-green-600">
                    R$ 2.850
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Atual</span>
                <span className="font-bold text-green-600 text-lg">
                  R$ {financialSummary.grossRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
