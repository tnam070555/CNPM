const test = require("node:test");
const assert = require("node:assert");
const artifactRepository = require("../src/repositories/artifactRepository");
const artifactService = require("../src/services/artifactService");

test("lấy tất cả hiện vật", async (t) => {
  t.mock.method(artifactRepository, "findAll", async () => [{ id: 1, name: "A" }]);
  const result = await artifactService.getAllArtifacts();
  assert.strictEqual(result.length, 1);
});

test("id không tồn tại thì ném lỗi 404", async (t) => {
  t.mock.method(artifactRepository, "findById", async () => undefined);
  await assert.rejects(
    () => artifactService.getArtifactById(999),
    (err) => err.status === 404
  );
});

test("id không phải số thì ném lỗi 400", async () => {
  await assert.rejects(
    () => artifactService.getArtifactById(NaN),
    (err) => err.status === 400
  );
});

test("tạo hiện vật thiếu tên thì ném lỗi 400", async () => {
  await assert.rejects(
    () => artifactService.createArtifact({ description: "không có tên" }),
    (err) => err.status === 400
  );
});
