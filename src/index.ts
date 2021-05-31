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

  addContact = (
    email: string,
    name: string,
    company: string
  ): Promise<Response> => {
    const data = {
      doctype: 'Lead',
      status: 'Lead',
      company: company,
      lead_name: name,
      email_id: email,
    }

    return fetch(this.host, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: `token ${this.apiKey}:${this.apiSecret}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((resp) => JSON.stringify(resp))
      .catch((err) => err)
  }
}

export { ERPNextPopup }
