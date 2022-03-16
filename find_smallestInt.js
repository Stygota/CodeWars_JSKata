class SmallestIntegerFinder {
    findSmallestInt(args) {
      let smallest = args[0]; // initialize with valid value from args array
      args.map(num => smallest = (smallest < num)?smallest:num); // replace smallest if current args value smaller
      
      return smallest;
    }
  }