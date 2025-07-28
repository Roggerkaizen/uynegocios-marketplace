import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { 
  MapPin, 
  Heart, 
  Star, 
  Eye, 
  Phone, 
  Mail,
  Clock
} from 'lucide-react'
import { motion } from 'framer-motion'

const AnuncioCard = ({ anuncio, featured = false, compact = false }) => {
  const [showModal, setShowModal] = useState(false)
  
  const {
    id,
    title,
    price,
    location,
    category,
    image,
    views,
    favorites,
    timeAgo,
    description,
    phone,
    email,
    seller
  } = anuncio

  // Verificar se é anúncio fictício (sem ID do backend ou IDs específicos)
  const isFakeAd = !id || id < 1000

  const handleContact = (type) => {
    if (isFakeAd) {
      setShowModal(true)
      return
    }
    
    if (type === 'whatsapp') {
      const message = `Hola! Me interesa tu anuncio: ${title} - ${price}`
      const whatsappUrl = `https://wa.me/598${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    } else if (type === 'phone') {
      window.open(`tel:+598${phone.replace(/\D/g, '')}`)
    }
  }

  const handleFavorite = () => {
    if (isFakeAd) {
      setShowModal(true)
      return
    }
    // Implementar lógica de favoritos
    console.log('Adicionado aos favoritos:', id)
  }

  const handleCardClick = () => {
    if (isFakeAd) {
      setShowModal(true)
    }
  }

  if (compact) {
    return (
      <>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="cursor-pointer"
          onClick={handleCardClick}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative">
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Imagen del producto</span>
              </div>
              {featured && (
                <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-900">
                  <Star className="w-3 h-3 mr-1" />
                  Destacado
                </Badge>
              )}
              {timeAgo && (
                <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                  Nuevo
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation()
                  handleFavorite()
                }}
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
              <p className="text-xl font-bold text-blue-600 mb-2">{price}</p>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{location}</span>
              </div>
              {timeAgo && (
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  Hace {timeAgo}
                </div>
              )}
              {views && favorites && (
                <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {views}
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {favorites}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Modal para anúncios fictícios */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="text-center">
                <div className="mb-4">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    ¡Este es un anuncio de ejemplo!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Este producto es solo para mostrar cómo funciona UYNegócios. 
                    <strong> ¡Animate a ser parte de nuestra comunidad!</strong>
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    🎯 ¿Tenés algo para vender?
                  </h4>
                  <p className="text-blue-800 text-sm">
                    Desapegate de lo que ya no usás y dale una nueva vida. 
                    En UYNegócios encontrás compradores para todo: ropa, electrónicos, 
                    muebles, libros... ¡Lo que sea!
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowModal(false)}
                    className="flex-1"
                  >
                    Cerrar
                  </Button>
                  <Button
                    onClick={() => {
                      setShowModal(false)
                      window.location.href = '/publicar'
                    }}
                    className="flex-1"
                  >
                    ¡Publicar ahora!
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        className="cursor-pointer"
        onClick={handleCardClick}
      >
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="relative">
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Imagen del producto</span>
            </div>
            {featured && (
              <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-900">
                <Star className="w-4 h-4 mr-1" />
                Destacado
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-3 right-3 bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation()
                handleFavorite()
              }}
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
          
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
              {timeAgo && (
                <span className="text-sm text-gray-500">Hace {timeAgo}</span>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {title}
            </h3>
            
            <p className="text-3xl font-bold text-blue-600 mb-4">{price}</p>
            
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{location}</span>
            </div>
            
            {description && (
              <p className="text-gray-700 mb-4 line-clamp-3">{description}</p>
            )}
            
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {views || 0}
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  {favorites || 0}
                </div>
              </div>
              {seller && (
                <span className="font-medium">Por {seller}</span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                onClick={(e) => {
                  e.stopPropagation()
                  handleContact('whatsapp')
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation()
                  handleContact('phone')
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Llamar
              </Button>
              <Button 
                size="sm" 
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation()
                  if (isFakeAd) {
                    setShowModal(true)
                  }
                }}
              >
                Ver detalles
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal para anúncios fictícios */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="mb-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ¡Este es un anuncio de ejemplo!
                </h3>
                <p className="text-gray-600 mb-6">
                  Este producto es solo para mostrar cómo funciona UYNegócios. 
                  <strong> ¡Animate a ser parte de nuestra comunidad!</strong>
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">
                  🎯 ¿Tenés algo para vender?
                </h4>
                <p className="text-blue-800 text-sm">
                  Desapegate de lo que ya no usás y dale una nueva vida. 
                  En UYNegócios encontrás compradores para todo: ropa, electrónicos, 
                  muebles, libros... ¡Lo que sea!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="flex-1"
                >
                  Cerrar
                </Button>
                <Button
                  onClick={() => {
                    setShowModal(false)
                    window.location.href = '/publicar'
                  }}
                  className="flex-1"
                >
                  ¡Publicar ahora!
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AnuncioCard

