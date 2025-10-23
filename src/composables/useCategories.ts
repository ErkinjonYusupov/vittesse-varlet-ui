export const categories = [
  { key: 'case', title: 'tr36', icon: 'lucide:pc-case' },
  { key: 'cpu', title: 'tr2', icon: 'solar:cpu-outline' },
  { key: 'mb', title: 'tr1', icon: 'bi:motherboard' },
  { key: 'ozu', title: 'tr3', icon: 'ri:ram-2-line' },
  { key: 'psu', title: 'tr4', icon: 'ic:outline-power' },
  { key: 'hdd', title: 'tr6', icon: 'clarity:ssd-line' },
  { key: 'gpu', title: 'tr7', icon: 'hugeicons:gpu' },
  { key: 'cooler', title: 'tr8', icon: 'grommet-icons:fan-option' },
  { key: 'monitor', title: 'tr9', icon: 'solar:monitor-outline' },
  { key: 'kv-m', title: 'tr10', icon: 'solar:keyboard-broken' },
]
export const firms = [
  {
    key: 'msi',
    title: 'MSI',
    categories: ['gpu', 'monitor', 'mb', 'case', 'psu'],
  },
  {
    key: 'asus',
    title: 'ASUS',
    categories: ['gpu', 'monitor', 'mb', 'case', 'psu'],
  },
  {
    key: 'gigabyte',
    title: 'Gigabyte',
    categories: ['gpu', 'mb', 'case'],
  },
  {
    key: 'amd',
    title: 'AMD',
    categories: ['cpu', 'gpu'],
  },
  {
    key: 'intel',
    title: 'Intel',
    categories: ['cpu'],
  },
  {
    key: 'corsair',
    title: 'Corsair',
    categories: ['psu', 'case', 'cooler', 'ozu'],
  },
  {
    key: 'kingston',
    title: 'Kingston',
    categories: ['ozu', 'hdd'],
  },
  {
    key: 'seagate',
    title: 'Seagate',
    categories: ['hdd'],
  },
  {
    key: 'wd',
    title: 'Western Digital',
    categories: ['hdd'],
  },
  {
    key: 'samsung',
    title: 'Samsung',
    categories: ['hdd', 'monitor'],
  },
  {
    key: 'nzxt',
    title: 'NZXT',
    categories: ['case', 'cooler'],
  },
  {
    key: 'cooler-master',
    title: 'Cooler Master',
    categories: ['case', 'cooler', 'psu'],
  },
  {
    key: 'logitech',
    title: 'Logitech',
    categories: ['kv-m'],
  },
  {
    key: 'razer',
    title: 'Razer',
    categories: ['kv-m'],
  },
  {
    key: 'dell',
    title: 'Dell',
    categories: ['monitor'],
  },
  {
    key: 'lg',
    title: 'LG',
    categories: ['monitor'],
  },
]
export const categoryFirmsMap: Record<string, string[]> = {
  'cpu': ['intel', 'amd'],
  'mb': ['msi', 'asus', 'gigabyte'],
  'gpu': ['msi', 'asus', 'gigabyte', 'amd'],
  'monitor': ['msi', 'asus', 'samsung', 'dell', 'lg'],
  'case': ['msi', 'asus', 'gigabyte', 'corsair', 'nzxt', 'cooler-master'],
  'psu': ['msi', 'asus', 'corsair', 'cooler-master'],
  'ozu': ['kingston', 'corsair'],
  'hdd': ['seagate', 'wd', 'kingston', 'samsung'],
  'cooler': ['corsair', 'nzxt', 'cooler-master'],
  'kv-m': ['logitech', 'razer'],
}
