import Link from 'next/link';

interface BrandStoryProps {
  title?: string;
  description?: string[];
  buttonText?: string;
  buttonLink?: string;
  theme?: 'light' | 'dark';
}

export default function BrandStory({
  title = "Our Story",
  description = [
    "At Ecomerec, we're more than just an online store — we're a platform built to bring people together through the joy of discovering quality products at fair prices.",
    "We believe in empowering small vendors, promoting transparency, and delivering real value to our customers — one product at a time."
  ],
  buttonText = "Learn More",
  buttonLink = "/about",
  theme = "light"
}: BrandStoryProps) {
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const headingColor = theme === "dark" ? "text-white" : "text-gray-900";
  const buttonStyle = theme === "dark" 
    ? "bg-white text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-white" 
    : "bg-black text-white hover:bg-gray-800 active:bg-gray-900 focus:ring-2 focus:ring-offset-2 focus:ring-black";

  return (
    <section className={`${bgColor} py-10 md:py-16 lg:py-20`} 
             aria-label="Brand story section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-5 md:mb-6 ${headingColor}`}>
          {title}
        </h2>
        
        <div className="space-y-3 sm:space-y-4">
          {description.map((paragraph, index) => (
            <p 
              key={index} 
              className={`text-base sm:text-lg ${textColor} leading-relaxed`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-7 md:mt-9">
          <Link
            href={buttonLink}
            className={`inline-block px-7 py-3.5 sm:px-8 sm:py-3 rounded-md transition duration-200 transform active:scale-[0.98] ${buttonStyle} font-medium text-base sm:text-lg focus:outline-none`}
            aria-label={`Learn more about ${title}`}
            role="button"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}