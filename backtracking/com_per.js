// 조합
const combination = (arr, selectNum) => {
    const result = [];
    if (selectNum === 1) return arr.map((e) => [e]);

    arr.forEach((item, idx, origin) => {
        const remain = origin.slice(idx + 1);
        const recall = combination(remain, selectNum - 1);
        const attach = recall.map((e) => [item, ...e]);

       result.push(...attach);
    });
    return result;
}

// 중복 조합
const combination2 = (arr, selectNum) => {
    const result = [];
    if (selectNum === 1) return arr.map((e) => [e]);

    arr.forEach((item, idx, origin) => {
        const remain = origin.slice(idx);
        const recall = combination2(remain, selectNum - 1);
        const attach = recall.map((e) => [item, ...e]);

        result.push(...attach);
    });
    return result;
}

// 순열
const permutation = (arr, selectNum) => {
    const result = [];
    if (selectNum === 1) return arr.map((e) => [e]);

    arr.forEach((item, idx, origin) => {
        const remain = [...origin.slice(0, idx), ...origin.slice(idx)];
        const recall = permutation(remain, selectNum - 1);
        const attach = recall.map((e) => [item, ...e]);

        result.push(...attach);
    });
    return result;
}

const newCom = combination2([1,7,8,9], 2);
const newPer = permutation([1,7,8,9], 2);
console.log(newPer);