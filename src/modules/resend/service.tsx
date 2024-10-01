import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import { Logger } from "@medusajs/medusa";
import { ProviderSendNotificationDTO, ProviderSendNotificationResultsDTO } from "@medusajs/types";
import { Resend } from 'resend';
import emails from "./emails"


type ResendOptions = {
  api_key: string
}

type InjectedDependencies = {
  logger: Logger
}


class ResendNotificationProviderService extends AbstractNotificationProviderService {
  private resendClient: Resend
  private logger: Logger

  constructor({ logger }: InjectedDependencies, options: ResendOptions) {
    super()
    this.resendClient = new Resend(options.api_key);
    this.logger = logger
  }

  async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
    const Template = emails[notification.template]

    if (!Template) {
      this.logger.error(`Couldn't find an email template for ${notification.template}. The valid options are ${Object.keys(emails).join(", ")}`)
      return {}
    }

    const { data, error } = await this.resendClient.emails.send({
      from: 'Sebrindom <seb@sebrindom.blue>',
      to: [notification.to],
      subject: 'Sending messages',
      react: <Template {...notification.data} />
    })

    if (error) {
      this.logger.error(`Failed to send email`, error)
      return {}
    }

    return { id: data.id }
  }
}

export default ResendNotificationProviderService
