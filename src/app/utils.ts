export function tw(classNames: string): string {
  return classNames.replaceAll(" false", '');
}