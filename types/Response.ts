export default interface Response {
    status: { value: string }
    data: { value: { dataBuffer: { data: number[] } } | undefined };
}