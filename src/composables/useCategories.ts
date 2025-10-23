export const categories = [
  { key: 'mb', title: 'tr1', icon: 'bi:motherboard' },
  { key: 'cpu', title: 'tr2', icon: 'solar:cpu-outline' },
  { key: 'ozu', title: 'tr3', icon: 'ri:ram-2-line' },
  { key: 'psu', title: 'tr4', icon: 'ic:outline-power' },
  { key: 'hdd', title: 'tr6', icon: 'clarity:ssd-line' },
  { key: 'gpu', title: 'tr7', icon: 'hugeicons:gpu' },
  { key: 'cooler', title: 'tr8', icon: 'grommet-icons:fan-option' },
  { key: 'monitor', title: 'tr9', icon: 'solar:monitor-outline' },
  { key: 'case', title: 'tr36', icon: 'lucide:pc-case' },
  { key: 'kv-m', title: 'tr10', icon: 'solar:keyboard-broken' },
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
