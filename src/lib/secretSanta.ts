export interface Match {
  giver: string;
  receiver: string;
  email?: string;
}

/**
 * Generates Secret Santa matches ensuring:
 * - No one is assigned to themselves
 * - Everyone gives exactly one gift
 * - Everyone receives exactly one gift
 */
export function generateSecretSantaMatches(participants: string[]): Match[] {
  if (participants.length < 2) {
    throw new Error("At least 2 participants are required");
  }

  // Create a shuffled copy for receivers
  const givers = [...participants];
  let receivers: string[] = [];
  
  // Keep shuffling until we get a valid derangement
  // (no person is assigned to themselves)
  let isValid = false;
  let attempts = 0;
  const maxAttempts = 1000;

  while (!isValid && attempts < maxAttempts) {
    receivers = shuffleArray([...participants]);
    isValid = givers.every((giver, index) => giver !== receivers[index]);
    attempts++;
  }

  if (!isValid) {
    // Fallback: create a simple rotation
    receivers = [...participants.slice(1), participants[0]];
  }

  return givers.map((giver, index) => ({
    giver,
    receiver: receivers[index],
  }));
}

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
