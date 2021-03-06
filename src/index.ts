/**
 * ERPNextPopup
 */
class ERPNextPopup {
  popup: HTMLElement
  apiKey: string
  apiSecret: string
  host: string

  /**
   * @since 0.0.1
   * @author Grynn Gmbh
   * @constructor
   * @param {string} popupId popup id
   * @param {string} apiKey api key
   * @param {string} apiSecret api secret
   * @param {URL} host host
   */
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

  /**
   * Unsubscribe From Event
   * @author Grynn Gmbh
   * @since 0.0.1
   * @example
   * ```
   * const app = new ERPNextPopup('popup', 'apiKey', 'apiSecret')
   * app.unsubscribe()
   * ```
   */
  unsubscribe = () => {
    window.document.removeEventListener('mouseout', this.show)
  }

  /**
   * Show Popup
   * @author Grynn Gmbh
   * @since 0.0.1
   * @example
   * ```
   * const app = new ERPNextPopup('popup', 'apiKey', 'apiSecret')
   * app.show()
   * ```
   */
  show = () => {
    this.popup.style.display = 'block'
  }

  /**
   * Hide Popup
   * @author Grynn Gmbh
   * @since 0.0.1
   * @example
   * ```
   * const app = new ERPNextPopup('popup', 'apiKey', 'apiSecret')
   * app.hide()
   * ```
   */
  hide = () => {
    this.popup.style.display = 'none'
  }

  /**
   * Create Lead in ERPNext
   * @param {string} email Email
   * @param {string} name name of Lead
   * @param {string} company Company of Lead
   * @returns {Promise<Response>} A Promise of Return
   */
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
