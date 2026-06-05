export function toProgramCard(program) {
  return {
    id: program.id,
    title: program.title,
    type: program.type,
    typeLabel: toProgramTypeLabel(program.type),
    description: program.description ?? null,

    posterPath: program.posterPath ?? null,
    posterUrl: program.posterUrl ?? null,

    backdropPath: program.backdropPath ?? null,
    backdropUrl: program.backdropUrl ?? null,

    rottenTomatoesUrl: program.rottenTomatoesUrl ?? null,

    streamingPlatform: program.streamingPlatform ?? null,
    streamingPlatformLabel: toStreamingPlatformLabel(program.streamingPlatform)
  };
}

export function toProgramCards(programs) {
  return programs.map(toProgramCard);
}

function toProgramTypeLabel(type) {
  switch (type) {
    case "MOVIE":
      return "Movie";
    case "TV_SHOW":
      return "TV Show";
    default:
      return "Program";
  }
}

function toStreamingPlatformLabel(streamingPlatform) {
  switch (streamingPlatform) {
    case "NETFLIX":
      return "Netflix";
    case "PRIME_VIDEO":
      return "Prime Video";
    case "DISNEY_PLUS":
      return "Disney+";
    case "NOW_TV":
      return "NOW TV";
    default:
      return null;
  }
}