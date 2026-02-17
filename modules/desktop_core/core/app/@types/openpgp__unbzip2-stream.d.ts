declare module '@openpgp/unbzip2-stream' {
  interface InputStream {
    getReader(): any;
  }
  declare function unbzip2Stream(input: InputStream): ReadableStream;

  export = unbzip2Stream;
}
