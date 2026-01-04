import fs from 'fs';

// PNGファイルのサイズを読み取る簡易的な方法
function getPNGSize(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    // PNGファイルのIHDRチャンクから幅と高さを読み取る
    // オフセット16から4バイトが幅、20から4バイトが高さ
    if (buffer.length < 24) {
      return null;
    }
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  } catch (error) {
    return null;
  }
}

const icon192 = getPNGSize('public/icon-192.png');
const icon512 = getPNGSize('public/icon-512.png');

console.log('アイコンファイルのサイズ確認:');
console.log('--------------------------------');
if (icon192) {
  console.log(`icon-192.png: ${icon192.width}x${icon192.height}px ${icon192.width === 192 && icon192.height === 192 ? '✓ 正しいサイズ' : '✗ サイズが正しくありません'}`);
} else {
  console.log('icon-192.png: 読み取りエラー');
}

if (icon512) {
  console.log(`icon-512.png: ${icon512.width}x${icon512.height}px ${icon512.width === 512 && icon512.height === 512 ? '✓ 正しいサイズ' : '✗ サイズが正しくありません'}`);
} else {
  console.log('icon-512.png: 読み取りエラー');
}

