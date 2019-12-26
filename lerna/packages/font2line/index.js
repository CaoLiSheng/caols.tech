// import drawChar from './src/drawChar';

// const fromEl = document.getElementById('from');
// drawChar(fromEl, '又', {
//   font: 'normal 100px PingFang SC',
//   left: 0,
//   top: 0,
//   textBaseline: 'top'
// });

import readGlyphs from './src/readGlyphs';
import drawTextGeometry from './src/drawTextGeometry';

const path = document.getElementById('path');
const anim = document.getElementById('anim');
const fileInput = document.getElementById('font-file-selector');

fileInput.addEventListener(
  'change',
  readGlyphs(fileInput, font => {
    const scale = (1000 * 100) / ((font.unitsPerEm || 2048) * 72);
    const token = { o: '' };
    const glyph = font.charToGlyph('又');
    glyph.path.commands.forEach(function(command, i) {
      if (command.type.toLowerCase() === 'c') {
        command.type = 'b';
      }
      token.o += command.type.toLowerCase();
      token.o += ' ';
      if (command.x !== undefined && command.y !== undefined) {
        token.o += Math.round(command.x * scale);
        token.o += ' ';
        token.o += Math.round(command.y * scale);
        token.o += ' ';
      }
      if (command.x1 !== undefined && command.y1 !== undefined) {
        token.o += Math.round(command.x1 * scale);
        token.o += ' ';
        token.o += Math.round(command.y1 * scale);
        token.o += ' ';
      }
      if (command.x2 !== undefined && command.y2 !== undefined) {
        token.o += Math.round(command.x2 * scale);
        token.o += ' ';
        token.o += Math.round(command.y2 * scale);
        token.o += ' ';
      }
    });
    drawTextGeometry(null, '又', {
      glyphs: { 又: token },
      familyName: font.familyName,
      ascender: Math.round(font.ascender * scale),
      descender: Math.round(font.descender * scale),
      underlinePosition: Math.round(font.tables.post.underlinePosition * scale),
      underlineThickness: Math.round(
        font.tables.post.underlineThickness * scale
      ),
      boundingBox: {
        yMin: Math.round(font.tables.head.yMin * scale),
        xMin: Math.round(font.tables.head.xMin * scale),
        yMax: Math.round(font.tables.head.yMax * scale),
        xMax: Math.round(font.tables.head.xMax * scale)
      },
      resolution: 1000,
      original_font_information: font.tables.name
    });
    console.log(
      JSON.stringify({
        glyphs: { 又: token },
        familyName: font.familyName,
        ascender: Math.round(font.ascender * scale),
        descender: Math.round(font.descender * scale),
        underlinePosition: Math.round(
          font.tables.post.underlinePosition * scale
        ),
        underlineThickness: Math.round(
          font.tables.post.underlineThickness * scale
        ),
        boundingBox: {
          yMin: Math.round(font.tables.head.yMin * scale),
          xMin: Math.round(font.tables.head.xMin * scale),
          yMax: Math.round(font.tables.head.yMax * scale),
          xMax: Math.round(font.tables.head.xMax * scale)
        },
        resolution: 1000,
        original_font_information: font.tables.name
      })
    );

    // const alphabets = ['又', '又'];
    // let counter = 0;
    // let lastD = '';

    // function show() {
    //   const newD = font.getPath(alphabets[counter]).toPathData();
    //   // if (!lastD) {
    //   // path.setAttribute('d', newD);
    //   // } else {
    //   anim.setAttribute('from', lastD);
    //   anim.setAttribute('to', newD);
    //   // }
    //   lastD = newD;
    //   if (++counter >= 2) counter = 0;
    //   setTimeout(show, 3000);
    // }

    // setTimeout(show, 3000);
  })
);

import font from './font2.json';
drawTextGeometry(null, '又', font);
