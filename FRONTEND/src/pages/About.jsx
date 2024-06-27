
export default function About() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <section className="my-8">
            <h1 className="text-3xl font-bold mb-4">À propos</h1>
            <p className="text-lg text-muted-foreground">
              Bienvenue sur "Espérance de vie en France", votre source
              d'informations sur l'espérance de vie moyenne dans les différentes
              régions, départements et villes de France. Notre mission est de
              vous fournir des données précises et actualisées sur la durée de
              vie moyenne des habitants, ainsi que des insights sur les
              facteurs qui influencent ces chiffres.
            </p>
            <p className="text-lg text-muted-foreground mt-4">
              Explorez notre carte interactive pour découvrir comment
              l'espérance de vie varie à travers le pays. Que vous soyez
              intéressé par les tendances régionales, les performances des
              systèmes de santé locaux ou les caractéristiques démographiques,
              notre site vous offre les outils nécessaires pour comprendre ces
              aspects cruciaux de la vie en France.
            </p>
            <p className="text-lg text-muted-foreground mt-4">
              Restez informé et engagez-vous dans la discussion sur la qualité
              de vie et la santé publique en France. Nous sommes là pour vous
              fournir les données dont vous avez besoin pour prendre des
              décisions éclairées et mieux comprendre les enjeux autour de
              l'espérance de vie.
            </p>
            <p className="text-lg text-muted-foreground mt-4">
              Merci de visiter "Espérance de vie en France". Ensemble, explorons
              les facteurs qui contribuent à une vie longue et en bonne santé
              dans notre belle nation.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

