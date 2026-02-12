import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function ImageManager({ images = [], onChange }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [localImages, setLocalImages] = useState(images);
  const { t } = useTranslation();

  // 🔹 Sincronizar con props externas
  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const addImage = () => {
    if (!newUrl) return;
    const updated = [...localImages, newUrl];
    setLocalImages(updated);
    onChange(updated);
    setNewUrl("");
  };

  const removeImage = (index) => {
    const updated = localImages.filter((_, i) => i !== index);
    setLocalImages(updated);
    onChange(updated);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...localImages];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setLocalImages(updated);
    onChange(updated);
  };

  const moveDown = (index) => {
    if (index === localImages.length - 1) return;
    const updated = [...localImages];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setLocalImages(updated);
    onChange(updated);
  };

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
      >
        {t("ImagenAdmin")}
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">{t("userImages")}</h2>

            {/* Añadir URL */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="URL de la imagen"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="flex-1 border p-2 rounded"
              />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                {t("add")}
              </button>
            </div>

            {/* Previsualización y reordenar */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {localImages.map((img, i) => (
                <div key={i} className="flex items-center gap-2">
                  <img
                    src={img}
                    alt={`Imagen ${i + 1}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => moveUp(i)}
                        disabled={i === 0}
                        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveDown(i)}
                        disabled={i === localImages.length - 1}
                        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                {t("saveChanges")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}