import Image from "next/image"

interface CoinIconProps {
  className?: string
  size?: number
}

export function CoinIcon({ className, size = 16 }: CoinIconProps) {
  return (
    <Image
      src="/coin.png" // Updated to look directly in the public directory
      alt="Rain.GG Coin"
      width={size}
      height={size}
      className={`inline-block ${className || ""}`}
    />
  )
}
