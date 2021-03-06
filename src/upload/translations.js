import { l, localiseTranslation } from 'utils-pack'

export const _ = {
  FILE: {
    [l.ENGLISH]: 'File',
    // [l.RUSSIAN]: 'Файл',
  },
  FILES_ONLY: {
    [l.ENGLISH]: 'files only',
    // [l.RUSSIAN]: 'файлы только',
  },
  FILE_UPLOAD_FAILED: {
    [l.ENGLISH]: 'File Upload Failed!',
    // [l.RUSSIAN]: 'Ошибка Загрузки Файла!',
  },
  MAXIMUM_FILE_SIZE_EXCEEDED: {
    [l.ENGLISH]: 'Maximum File Size Exceeded!',
    // [l.RUSSIAN]: 'Превышен Максимальный Размер Файла!',
  },
  MUST_BE_UNDER: {
    [l.ENGLISH]: 'must be under',
    // [l.RUSSIAN]: 'должен быть до',
  },
  SELECT_OR_DROP: {
    [l.ENGLISH]: 'Select or Drop',
    // [l.RUSSIAN]: 'Выберите или Перетащите',
  },
  UPLOAD: {
    // as verb
    [l.ENGLISH]: 'Upload',
    // [l.RUSSIAN]: 'Загрузите',
  },
  UPLOADED: {
    // as verb
    [l.ENGLISH]: 'Uploaded',
    // [l.RUSSIAN]: 'Загружен',
  },

  // Project Specific
  // ---------------------------------------------------------------------------
  DIMENSION_MUST_BE_ONE_OF: {
    [l.ENGLISH]: 'dimension must be one of',
    // [l.RUSSIAN]: 'измерение должно быть одним из',
  },
  INVALID_ASPECT_RATIO: {
    [l.ENGLISH]: 'Invalid Aspect Ratio!',
    // [l.RUSSIAN]: 'Неверное Соотношение Сторон!',
  },
}

localiseTranslation(_)
