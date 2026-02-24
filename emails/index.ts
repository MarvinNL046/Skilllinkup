// Email templates for SkillLinkup
// Uses @react-email/components for beautiful, responsive emails
// Supports locales: en (English), nl (Dutch)

export { WelcomeEmail } from './welcome';
export { NewsletterEmail } from './newsletter';
export { ContactAdminEmail } from './contact-admin';
export { ContactConfirmationEmail } from './contact-confirmation';
export { OrderConfirmationEmail } from './order-confirmation';
export { NewOrderEmail } from './new-order';
export { PaymentFailedEmail } from './payment-failed';
export { OrderDeliveredEmail } from './order-delivered';
export { OrderCompletedEmail } from './order-completed';
export { ReviewReceivedEmail } from './review-received';
export { NewBidEmail } from './new-bid';
export { BidAcceptedEmail } from './bid-accepted';
export { BidRejectedEmail } from './bid-rejected';
export { NewMessageEmail } from './new-message';

export {
 type Locale,
 translations,
 getWelcomeTranslations,
 getNewsletterTranslations,
 getContactAdminTranslations,
 getContactConfirmationTranslations,
 getOrderConfirmationTranslations,
 getNewOrderTranslations,
 getPaymentFailedTranslations,
 getOrderDeliveredTranslations,
 getOrderCompletedTranslations,
 getReviewReceivedTranslations,
 getNewBidTranslations,
 getBidAcceptedTranslations,
 getBidRejectedTranslations,
 getNewMessageTranslations,
} from './translations';
