import React from 'react'

interface LanguageIconsProps {
  icon: React.ReactElement | React.FC<object>
  iconName: string
  iconColor: string
}

export const LanguageIcons: React.FC<LanguageIconsProps> = ({
  icon,
  iconName,
  iconColor,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="mt-3">
        {typeof icon === 'function' ? React.createElement(icon) : icon}
      </div>
      <div
        className={`font-jetbrains text-h2-m`}
        style={{
          color: iconColor,
        }}
      >
        {iconName}
      </div>
    </div>
  )
}
