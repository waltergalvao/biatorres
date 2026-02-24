"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
} from "./AnimateOnScroll";
import { projects } from "@/data/projects";

const featured = projects.filter((p) => p.featured).slice(0, 5);

export function FeaturedProjects() {
  return (
    <section className="section-padding section-spacing bg-brand-bg-light">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 gap-6">
        <AnimateOnScroll>
          <span className="text-label mb-4 block">Portfólio</span>
          <h2 className="font-serif text-display">
            Projetos
            <br />
            Selecionados
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <Link
            href="/projetos"
            className="tracking-[0.08em] uppercase text-brand-text-muted hover:text-brand-text transition-colors duration-300 border-b border-brand-border hover:border-brand-text pb-1"
          >
            Ver todos os projetos
          </Link>
        </AnimateOnScroll>
      </div>

      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
        staggerDelay={0.15}
      >
        {featured[0] && (
          <StaggerItem className="md:col-span-7">
            <ProjectCard project={featured[0]} aspect="aspect-[4/3]" />
          </StaggerItem>
        )}
        {featured[1] && (
          <StaggerItem className="md:col-span-5">
            <ProjectCard project={featured[1]} aspect="aspect-[3/4]" />
          </StaggerItem>
        )}
        {featured[2] && (
          <StaggerItem className="md:col-span-5">
            <ProjectCard project={featured[2]} aspect="aspect-[3/4]" />
          </StaggerItem>
        )}
        {featured[3] && (
          <StaggerItem className="md:col-span-7">
            <ProjectCard project={featured[3]} aspect="aspect-[4/3]" />
          </StaggerItem>
        )}
        {featured[4] && (
          <StaggerItem className="md:col-span-12">
            <ProjectCard project={featured[4]} aspect="aspect-[21/9]" />
          </StaggerItem>
        )}
      </StaggerContainer>
    </section>
  );
}

function ProjectCard({
  project,
  aspect,
}: {
  project: (typeof featured)[0];
  aspect: string;
}) {
  return (
    <Link href="/projetos" className="group block relative overflow-hidden">
      <div className={`relative ${aspect} overflow-hidden`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-1200 ease-elegant group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-brand-text/0 group-hover:bg-brand-text/20 transition-colors duration-700" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-[10px] tracking-[0.2em] uppercase text-brand-bg/80">
            {project.categoryLabel}
          </span>
          <h3 className="font-serif text-xl md:text-2xl text-brand-bg mt-1">
            {project.title}
          </h3>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <h3 className="font-serif text-2xl text-brand-text">{project.title}</h3>
        <span className="text-xs tracking-[0.1em] text-brand-text-muted">
          {project.year}
        </span>
      </div>
    </Link>
  );
}
