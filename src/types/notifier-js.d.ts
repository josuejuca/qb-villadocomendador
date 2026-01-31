declare module "notifier-js" {
  type NotificationId = string | number;

  const notifier: {
    show(
      title: string,
      message: string,
      color?: string,
      icon?: string,
      timeout?: number
    ): NotificationId;
    hide(id: NotificationId): void;
  };

  export default notifier;
}
