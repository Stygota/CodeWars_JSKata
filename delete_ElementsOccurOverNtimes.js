function deleteNth(arr,n){
    let counts = {};
    let purgedArr = arr.map( num => {
      if(counts[num]) { counts[num]+=1; } // we've seen this number before...
      else { counts[num] = 1; } // we haven't seen this number
      /* assuming all valid passed numbers are positive integers
         using 0 as a filter value */
      return (counts[num]<=n)?num:0;
    });
    return purgedArr.filter(num => num>0);
  }

  function test_deleteNth(arr, n, expectedValue) {
      let testValue = deleteNth(arr, n);
      // slightly hacky - effectively a looped comparison anyway...
      console.assert(testValue.join('')===expectedValue.join(''), `Test value [${testValue}] did not match expected value [${expectedValue}]`);
  }

  test_deleteNth([20,37,20,21], 1, [20,37,21]);
  test_deleteNth([1,1,3,3,7,2,2,2,2], 3, [1,1,3,3,7,2,2,2]);