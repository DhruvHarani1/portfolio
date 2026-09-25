import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import AllProjects from "@/components/sections/AllProjects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import GitHubActivity from "@/components/sections/GitHubActivity";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import { fetchAllRepos, fetchContributions } from "@/lib/github";
import { FEATURED_PROJECTS } from "@/lib/featured-projects";

// Revalidate every hour (ISR)
export const revalidate = 3600;

export default async function HomePage() {
  const [repos, contributions] = await Promise.all([
    fetchAllRepos(),
    fetchContributions(),
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <FeaturedProjects projects={FEATURED_PROJECTS} repos={repos} />
        <AllProjects repos={repos} />
        <Experience />
        <Skills />
        <GitHubActivity calendar={contributions} />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
