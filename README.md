# PushNotification-Salesforce

## Proceso de suscripción: 
En el **[Componente de subscipción](https://github.com/AllanTorresBass/PushNotification-Salesforce/blob/main/components/SubscriptionNotification.js)** esta segmento de codigo referente a la suscripción y desuscripción a una notificación. 
  
  En este compenente se usan dos funciones: 
- [updateSubscriptionToNotification](https://github.com/AllanTorresBass/PushNotification-Salesforce/blob/main/functions/updateSubscriptionToNotifications.js)
- [readSubscriptionToNotification](https://github.com/AllanTorresBass/PushNotification-Salesforce/blob/main/functions/readSubscriptionToNotification.js)

## Proceso para mostrar todas las notificaciones recibidas: 
En el **[Componente de ShowNotifications]([https://github.com/AllanTorresBass/PushNotification-Salesforce/blob/main/components/SubscriptionNotification.js](https://github.com/AllanTorresBass/PushNotification-Salesforce/blob/main/components/ShowNotifications.js))** esta segmento de codigo referente a mostrar la lista de las suscripciones por cada tipo de notificación, y los diferentes procesos como notificación leida y borrar notificación . 
  
  En este compenente se usan dos funciones: 
- [queryPushNotificationLog](https://github.com/AllanTorresBass/PushNotification-Salesforce/blob/main/functions/updateSubscriptionToNotifications.js)
- [updateUnreadToNotification](https://github.com/AllanTorresBass/PushNotification-Salesforce/blob/main/functions/readSubscriptionToNotification.js)
- [updateUnreadToNotification](https://github.com/AllanTorresBass/PushNotification-Salesforce/blob/main/functions/updateDeletedToNotification.js)
