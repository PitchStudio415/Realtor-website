import { type ReactNode } from "react";

interface SplitHeroProps {
  title: ReactNode;
  titleTestId?: string;
  subtitle?: ReactNode;
  eyebrow?: ReactNode;
  photo: string;
  photoAlt: string;
  children?: ReactNode;
}

/**
 * Dark split hero matching the homepage: copy on the left, a tall portrait
 * photo flush to the bottom edge on the right (hidden below lg).
 */
export function SplitHero({
  title,
  titleTestId,
  subtitle,
  eyebrow,
  photo,
  photoAlt,
  children,
}: SplitHeroProps) {
  return (
    <section className="bg-[#071B2C] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end gap-0">
          <div className="flex-1 py-14 lg:py-20 lg:pr-10 flex flex-col justify-center">
            {eyebrow}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              data-testid={titleTestId}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
                {subtitle}
              </p>
            )}
            {children && (
              <div className="flex flex-col sm:flex-row gap-4">{children}</div>
            )}
          </div>
          <div className="hidden lg:block self-end flex-shrink-0">
            <div className="w-64 xl:w-72 h-[400px] xl:h-[440px] rounded-t-3xl overflow-hidden">
              <img
                src={photo}
                alt={photoAlt}
                className="w-full h-full object-cover object-top"
                width={576}
                height={880}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
