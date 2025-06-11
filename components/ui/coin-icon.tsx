import Image from "next/image"

interface CoinIconProps {
  className?: string
  size?: number
}

export function CoinIcon({ className, size = 16 }: CoinIconProps) {
  return (
    <Image
      src="/images/coin.png"
      alt="Rain.GG Coin"
      width={size}
      height={size}
      className={`inline-block ${className || ""}`}
    />
  )
}
