const roles = new Set(['client', 'freelancer', 'local_professional', 'candidate', 'company']);
export function onboardingDraftKey(userId, role, world) {
  return userId ? `skilllinkup-onboarding:${userId}:${role || 'start'}:${world || 'default'}` : null;
}
export function restoreOnboardingDraft(raw) {
  try {
    const value = JSON.parse(raw || 'null');
    if (value?.version !== 1 || !roles.has(value.role)) return null;
    const text = (key, max) => typeof value[key] === 'string' ? value[key].slice(0, max) : '';
    return {
      role: value.role, step: value.step === 1 ? 1 : 2,
      world: value.role === 'client' ? (value.world === 'local' ? 'local' : 'online') : value.role === 'freelancer' ? 'online' : value.role === 'local_professional' ? 'local' : 'jobs',
      selections: Array.isArray(value.selections) ? [...new Set(value.selections.filter(x => typeof x === 'string' && x.length <= 100))].slice(0, 8) : [],
      headline: text('headline', 200), bio: text('bio', 5000), city: text('city', 200), rate: text('rate', 10), companyName: text('companyName', 200),
    };
  } catch { return null; }
}
