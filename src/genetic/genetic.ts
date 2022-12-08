const CANCER_RATE = 0.15;

export class Gene {
  type: "int" | "float";
  min: number;
  max: number;
  value: number;

  constructor(min, max, gene, type) {
    this.min = min;
    this.max = max;
    this.type = type;

    if (type === "float") {
      this.value = gene;
    } else if (type === "int") {
      this.value = Math.round(gene);
    }
  }
}

export class Fenotype {
  public genes: Gene[];
  created_at: number;

  constructor(genes) {
    this.genes = genes;
    this.created_at = new Date().getTime();
  }
}

export function randomMutate(gene: Gene): Gene {
  if (Math.random() >= CANCER_RATE) {
    // we should randomly mutate this gene
    const newGene = new Gene(
      gene.min,
      gene.max,
      Math.random() * (gene.max - gene.min) + gene.min,
      gene.type
    );

    if (gene.type === "int") {
      newGene.value = Math.round(newGene.value);
    }

    return newGene;
  } else {
    // we should not mutate this gene
    return gene;
  }
}

export function crossover(genes: Fenotype[], geneIndex: number): Gene {
  const g = new Gene(
    genes[0].genes[geneIndex].min,
    genes[0].genes[geneIndex].max,
    genes[0].genes[geneIndex].value,
    genes[0].genes[geneIndex].type
  );

  // average
  for (let i = 1; i < genes.length; i++) {
    g.value += genes[i].genes[geneIndex].value;
  }
  g.value /= genes.length;

  // //pick random
  // g.value =
  //   genes[Math.floor(Math.random() * genes.length)].genes[geneIndex].value;

  if (g.type === "int") {
    g.value = Math.round(Math.abs(g.value));
  }

  return g;
}

function fitness(fenotype: Fenotype): number {
  // return Math.log(
  return Math.abs((fenotype.created_at - new Date().getTime()) / 1000.0);
  // );
}

function weighted_random(
  items: Fenotype[],
  weights: number[],
  N: number
): Fenotype[] {
  let i: number;

  // Normalize the weights so they sum to 1
  let totalWeight = weights.reduce((a, b) => a + b);
  weights = weights.map((w) => w / totalWeight);

  // Create an array of cumulative weights
  let cumWeights = weights.map((w, i) => {
    return weights.slice(0, i + 1).reduce((a, b) => a + b);
  });

  // Generate N random numbers between 0 and 1
  let randoms: number[] = [];
  for (i = 0; i < N; i++) {
    randoms.push(Math.random());
  }

  // Use the random numbers and the cumulative weights array to select the items
  let selectedItems = randoms.map((r) => {
    for (i = 0; i < cumWeights.length; i++) {
      if (cumWeights[i] > r) break;
    }
    return items[i];
  });

  return selectedItems;
}

export function sex(parents: Fenotype[]): Fenotype {
  // parents have porportionally more chances to get selected as parents if they have higher fitness
  let fitnesses: number[] = [];
  for (let i = 0; i < parents.length; i++) {
    fitnesses.push(fitness(parents[i]));
  }

  const parentsToSex = weighted_random(parents, fitnesses, 2);
  // loop over genes and crossover

  const newFeno = new Fenotype([]);
  for (let i = 0; i < parents[0].genes.length; i++) {
    const newGene = randomMutate(crossover(parentsToSex, i));
    newFeno.genes.push(newGene);
  }

  return newFeno;
}
