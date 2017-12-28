export function getFaceIds(faces) {
    let faceIds = [];
    for (const face of faces) {
        console.log(face);
        if (face && face.faceId && typeof face.faceId === "string")
            faceIds.push(face.faceId);
    }
    return faceIds;
}
