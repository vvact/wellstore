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
    "At Ecomerec, we’re more than just an online store — we’re a platform built to bring people together through the joy of discovering quality products at fair prices. Whether you're looking for daily essentials or the latest trends, our mission is to make shopping simple, reliable, and accessible across Kenya and beyond.",
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
    ? "bg-white text-gray-900 hover:bg-gray-200" 
    : "bg-black text-white hover:bg-gray-800";

  return (
    <section className={`${bgColor} py-12 md:py-16 lg:py-20`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${headingColor}`}>
          {title}
        </h2>
        
        <div className="space-y-4 max-w-2xl mx-auto">
          {description.map((paragraph, index) => (
            <p 
              key={index} 
              className={`text-lg ${textColor} leading-relaxed`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 md:mt-10">
          <Link
            href={buttonLink}
            className={`inline-block px-8 py-3 rounded-md transition duration-300 ${buttonStyle} font-medium`}
            aria-label={`Learn more about ${title}`}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}