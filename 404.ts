export default ({ response }: { response: any }) => {
    response.status = 400;
    response.body = {
        error: "Not found",
    };
};

