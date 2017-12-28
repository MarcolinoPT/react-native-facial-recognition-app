export function getPersonId(identities) {
    let personId = undefined;
    let bestConfidence = 0;
    for (const identity of identities) {
        if (
            identity.candidates.length > 0 &&
            identity.candidates[0].confidence > bestConfidence
        ) {
            personId = identity.candidates[0].personId;
        }
    }
    return personId;
}
