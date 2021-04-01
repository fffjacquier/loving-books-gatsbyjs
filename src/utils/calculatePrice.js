const formats = {
  Poche: 0.5,
  Broché: 1,
};

export default function calculatePrice(cents, format) {
  return cents * formats[format];
}

const formatter = Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
});

export function formatMoney(cents) {
  return formatter.format(cents / 100);
}
