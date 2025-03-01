export function tw(className: string): string {
  return className.replaceAll(" false", '');
}
