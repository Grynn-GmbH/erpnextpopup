import { apiKey, apiSecret, host, popupId } from './env'

/**
 * ERPNextPopup
 */
class ERPNextPopup {
  popup: HTMLElement
  apiKey: string
  apiSecret: string
  host: string

  constructor(
    popupId: string,
    apiKey: string,
    apiSecret: string,
    host: string | undefined
  ) {
    const element = document.getElementById(popupId)
    if (!element) throw new Error(`need valid id ${popupId}`)
    this.popup = element
    ;(this.apiKey = apiKey), (this.apiSecret = apiSecret)
    this.host = host ? host : window.location.href
    window.document.onmouseleave = this.show
  }

  unsubscribe = () => {
    window.document.removeEventListener('mouseout', this.show)
  }

  show = () => {
    this.popup.style.display = 'block'
  }

  hide = () => {
    this.popup.style.display = 'none'
  }

  addContact = (email: string): Promise<Response> => {
    const data = {
      email,
    }

    return fetch(this.host, {
      method: 'POST',
      headers: {
        mode: 'cros',
        'Content-Type': 'application/json',
        redirect: 'follow',
        body: JSON.stringify(data),
      },
    })
      .then((resp) => JSON.stringify(resp))
      .catch((err) => err)
  }
}

const p = new ERPNextPopup(popupId, apiKey, apiSecret, host)
