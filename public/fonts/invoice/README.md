# Invoice PDF fonts

These are the unmodified, static TrueType fonts from the official Inter 4.1 release by The Inter Project Authors. They are self-hosted for embedding in invoice PDFs.

- Release: https://github.com/rsms/inter/releases/tag/v4.1
- Download: https://github.com/rsms/inter/releases/download/v4.1/Inter-4.1.zip
- Original files: `extras/ttf/Inter-Regular.ttf` and `extras/ttf/Inter-SemiBold.ttf`
- License: the release's `LICENSE.txt`, copied unchanged as `OFL.txt` (SIL Open Font License 1.1).
- Retrieved: 2026-09-12. No conversion, instancing, subsetting or other font modification was performed.

Archive SHA-256: `9883fdd4a49d4fb66bd8177ba6625ef9a64aa45899767dde3d36aa425756b11e`.

| File | Weight | Bytes | SHA-256 |
| --- | --- | --- | --- |
| Inter-Regular.ttf | 400 | 411640 | `40d692fce188e4471e2b3cba937be967878f631ad3ebbbdcd587687c7ebe0c82` |
| Inter-SemiBold.ttf | 600 | 419744 | `78a843fade9d4612a5567302fb595b56976eb5fcebf4fea5a5912d638bafcde3` |

## Verification

Both files have a TrueType `glyf` table, no variable-font `fvar` table, 2,937 glyphs, and 2,852 mapped Unicode codepoints. `OS/2.usWeightClass` matches 400/600, and `OS/2.fsType` is zero. Internal font version: `Version 4.001;git-9221beed3`.

Character-map checks passed for ASCII invoice text, digits, EUR/GBP/USD symbols, nonbreaking space, en/em dashes, and representative extended Latin names such as Francois with diacritics, Lodz with stroke/accent, Czech carons, Turkish dotted/dotless I, and Dutch IJ. Greek and Cyrillic samples are present. Arabic and CJK samples are not covered; do not silently substitute or discard unsupported invoice characters.

The SemiBold file's PostScript name is `Inter-SemiBold`; its legacy family is `Inter SemiBold` and legacy subfamily is `Regular`. Register it explicitly as the renderer's semibold/bold face rather than inferring its weight from that legacy subfamily string.
