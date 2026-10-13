const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

const paths = {
  play: <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" stroke="none" />,
  info: (<><circle cx="12" cy="12" r="9.5" /><path d="M12 11v6" /><circle cx="12" cy="7.6" r=".6" fill="currentColor" /></>),
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  thumb: <path d="M7 11v9H4v-9zM7 11l4-7c1.6 0 2.6 1.2 2.3 2.8L12.8 10H19a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7" />,
  down: <path d="M6 9l6 6 6-6" />,
  left: <path d="M15 5l-7 7 7 7" />,
  right: <path d="M9 5l7 7-7 7" />,
  search: (<><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></>),
  bell: <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  briefcase: (<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2M3 12.5h18" /></>),
  code: <path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15" />,
  rocket: (<><path d="M12 15l-3-3c1.2-4.6 4.5-8.2 10.5-8.5-.3 6-3.9 9.3-8.5 10.5z" /><path d="M9 12l-3.5.5L4 15l4 .5M12 15l-.5 3.5L9 20l-.5-4" /><circle cx="15" cy="9" r="1.4" /></>),
  chart: <path d="M4 19h16M6 15l4-5 3 3 5-7M15 6h3v3" />,
  up: <path d="M6 15l6-6 6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />,
  award: (<><circle cx="12" cy="9" r="5.5" /><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5" /></>),
  cap: <path d="M2.5 9.5L12 5l9.5 4.5L12 14zM6 11.5v4.5c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M21.5 9.5v5" />,
  globe: (<><circle cx="12" cy="12" r="9.5" /><path d="M2.5 12h19M12 2.5c3 3 3 16 0 19M12 2.5c-3 3-3 16 0 19" /></>),
  clock: (<><circle cx="12" cy="12" r="9.5" /><path d="M12 7v5l3.5 2" /></>),
  compass: (<><circle cx="12" cy="12" r="9.5" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5l8.5 6.5 8.5-6.5" /></>),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z" />,
  pin: (<><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  download: <path d="M12 4v11M7 10.5l5 5 5-5M4.5 20h15" />,
  volumeOff: <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4zM16 9.5l5 5M21 9.5l-5 5" />,
  volumeOn: <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4zM15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" />,
  github: <path d="M9 19c-4 1.3-4-2-5.5-2.5M14.5 21v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.7 4.7 0 0 0-1.3-3.2 4.3 4.3 0 0 0 0-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.1 2.6 5.1 2.9 5.1 2.9a4.3 4.3 0 0 0 0 3.2 4.7 4.7 0 0 0-1.3 3.2c0 4.7 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21" />,
  linkedin: (<><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7.5 10.5v6M7.5 7.5v.01M11 16.5v-6M11 13a2.5 2.5 0 0 1 5 0v3.5" /></>),
}

export default function Icon({ name, size = 20, className = '', strokeWidth }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      {...base}
      {...(strokeWidth ? { strokeWidth } : {})}
    >
      {paths[name]}
    </svg>
  )
}
