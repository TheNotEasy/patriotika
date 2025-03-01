export function tw(className: React.ComponentProps<'div'>['className']): string {
  return className.replaceAll(" false", '');
}
