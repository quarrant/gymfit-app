const path = require('path');
const fs = require('fs');

const rootDirectory = process.cwd();

const appJson = require(path.resolve(rootDirectory, 'app.json'));
const resourcesImagesPath = path.resolve(rootDirectory, 'resources/images');
const imagesXcassetsPath = path.resolve(rootDirectory, 'ios', appJson.name, 'Images.xcassets');
const androidResPath = path.resolve(rootDirectory, 'android/app/src/main/res');

const iosContentObject = {
  images: [
    { idiom: 'universal', scale: '1x' },
    { idiom: 'universal', scale: '2x' },
    { idiom: 'universal', scale: '3x' },
  ],
  info: {
    version: 1,
    author: 'xcode',
  },
};

const images = fs.readdirSync(resourcesImagesPath);

const hasScaleSuffix = (filename) => {
  return /[@+1-3x]/g.test(filename);
};

const groupedImages = images.reduce((grouped, filename) => {
  const [shortname] = filename.split(/[@.]/);
  if (!grouped[shortname]) return { ...grouped, [shortname]: [filename] };
  grouped[shortname].push(filename);
  return grouped;
}, {});

Object.keys(groupedImages).forEach((shortname) => {
  const iosImagesetPath = path.resolve(imagesXcassetsPath, shortname + '.imageset');
  const androidDrawablePath = path.resolve(androidResPath, 'drawable');

  [iosImagesetPath, androidDrawablePath].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  });

  groupedImages[shortname].forEach((filename) => {
    const [_, extension] = filename.split('.');

    iosContentObject.images = iosContentObject.images.map((image) => {
      if (filename.includes(image.scale) || !hasScaleSuffix(filename)) {
        return { ...image, filename };
      }

      return image;
    });

    fs.writeFileSync(path.resolve(iosImagesetPath, 'Contents.json'), JSON.stringify(iosContentObject, null, 2));
    fs.copyFileSync(path.resolve(resourcesImagesPath, filename), path.resolve(iosImagesetPath, filename));
    fs.copyFileSync(
      path.resolve(resourcesImagesPath, filename),
      path.resolve(androidDrawablePath, shortname + '.' + extension),
    );
  });
});
