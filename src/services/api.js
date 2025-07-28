// Serviço de API para comunicação com o backend
const API_BASE_URL = '/api'  // Sempre usar URL relativa em produção

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Métodos para anúncios
  async getAnuncios(filters = {}) {
    const params = new URLSearchParams()
    
    if (filters.category) params.append('category', filters.category)
    if (filters.location) params.append('location', filters.location)
    if (filters.search) params.append('search', filters.search)
    if (filters.featured) params.append('featured', 'true')
    if (filters.limit) params.append('limit', filters.limit)
    
    const queryString = params.toString()
    const endpoint = queryString ? `/anuncios?${queryString}` : '/anuncios'
    
    return this.request(endpoint)
  }

  async getAnuncio(id) {
    return this.request(`/anuncios/${id}`)
  }

  async createAnuncio(anuncioData) {
    return this.request('/anuncios', {
      method: 'POST',
      body: JSON.stringify(anuncioData)
    })
  }

  async updateAnuncio(id, anuncioData) {
    return this.request(`/anuncios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(anuncioData)
    })
  }

  async deleteAnuncio(id, userEmail) {
    return this.request(`/anuncios/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ user_email: userEmail })
    })
  }

  async favoriteAnuncio(id) {
    return this.request(`/anuncios/${id}/favorite`, {
      method: 'POST'
    })
  }

  async getUserAnuncios(email, status = 'ativo') {
    const params = new URLSearchParams({ status })
    return this.request(`/usuarios/${email}/anuncios?${params}`)
  }

  // Métodos para categorias e estatísticas
  async getCategorias() {
    return this.request('/categorias')
  }

  async getStats() {
    return this.request('/stats')
  }

  // Métodos para pagamentos
  async getPlanos() {
    return this.request('/planos')
  }

  async createPaymentIntent(planData) {
    return this.request('/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify(planData)
    })
  }

  async confirmPayment(paymentData) {
    return this.request('/confirm-payment', {
      method: 'POST',
      body: JSON.stringify(paymentData)
    })
  }

  async activateFreePlan(userData) {
    return this.request('/activate-free-plan', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }

  async getUserPagamentos(email) {
    return this.request(`/usuarios/${email}/pagamentos`)
  }

  async getUserPlano(email) {
    return this.request(`/usuarios/${email}/plano`)
  }
}

// Instância singleton
const apiService = new ApiService()

export default apiService

// Funções de conveniência para compatibilidade
export const getAnuncios = (filters) => apiService.getAnuncios(filters)
export const createAnuncio = (data) => apiService.createAnuncio(data)
export const getStats = () => apiService.getStats()
export const getCategorias = () => apiService.getCategorias()
export const getPlanos = () => apiService.getPlanos()
export const activateFreePlan = (data) => apiService.activateFreePlan(data)
export const createPaymentIntent = (data) => apiService.createPaymentIntent(data)
export const confirmPayment = (data) => apiService.confirmPayment(data)

