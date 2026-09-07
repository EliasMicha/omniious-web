/** Normalize uploaded project photos for the web, preserving composition and orientation. */
export async function prepareProjectImage(file: File): Promise<File> {
  if (file.type === "image/gif") return file; // Preserve animation.
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = objectUrl;
    await image.decode();
    const scale = Math.min(
      1,
      2400 / Math.max(image.naturalWidth, image.naturalHeight),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context)
      throw new Error("No se pudo preparar la foto. Intenta con otro archivo.");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) =>
          result
            ? resolve(result)
            : reject(new Error("No se pudo preparar la foto.")),
        "image/webp",
        0.88,
      );
    });
    if (blob.size > 10 * 1024 * 1024)
      throw new Error(
        "La foto sigue siendo demasiado pesada. Exporta una versión más pequeña.",
      );
    const extension = blob.type === "image/webp" ? "webp" : "png";
    return new File(
      [blob],
      file.name.replace(/\.[^.]+$/, "") + "." + extension,
      { type: blob.type },
    );
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("No se pudo"))
      throw error;
    throw new Error(
      `${file.name}: no pudimos preparar esta imagen. Comprueba que el archivo sea una foto válida.`,
    );
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
