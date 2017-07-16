class Node {
  constructor(value,next) {
    this.next = next;
    this.value = value;
  }

  p() {
    var result = "";
    var n = this;
    while (n) {
      result += n.value + "->";
      n = n.next;
    }
    return result + "undefined";
  }
}

class LinkedList {
  constructor(head) {
    this.head = head;
  }

  insert(index, value) {
    var p_first = new Node(undefined, this.head);
    var n = p_first;
    if (!this.head) { this.head = new Node(value); }
    for (var i = 0; i < index; i++) {
      if (!(n.next)) {
        n.next = new Node();
      }
      n = n.next;
    }
    n.next = new Node(value, n.next);
    this.head = p_first.next;
    return p(this);
  }

  remove_index(index) {
    var n = new Node(undefined, this.head);
    if (index == 0) {
      this.head = n.next;
      if (n.next) {
        this.head = this.head.next;
      }
      return p(this);
    }
    for (var i = 0; i < index; i++) {
      if (!n) { return p(this); }
      n = n.next;
    }
    if (n.next) {
      n.next = n.next.next;
    }
    return p(this);
  }

  remove(value) {
    var n = this.head;
    var target_index = undefined;
    var cur_index = 0;
    while (n) {
      if (n.value == value) {
        target_index = cur_index;
        break;
      }
      cur_index++;
      n = n.next;
    }
    if (target_index !== undefined) {
      this.remove_index(target_index);
    }
    return p(this);
  }

  append(value, next) {
    // if no value given, new Node(undef,undef) is appended
    var n = this.head;
    if (n === undefined) {
      this.head = new Node(value, next);
      return p(this);
    }
    while (n.next) {
      n = n.next;
    }
    n.next = new Node(value, next);
    return p(this);
  }

  sel_sort() {
    var result = new LinkedList();
    var p_first = new Node(undefined,this.head);
    var n = p_first.next;

    while (p_first.next) {
      var min_val = undefined;
      while (n) {
        if (n.value != undefined && (min_val == undefined || n.value.toString() < ((min_val == undefined)?"":min_val).toString())) {
          min_val = n.value;
        }
        n = n.next;
      }
      this.remove(min_val);
      p_first.next = this.head;
      n = p_first.next;
      result.append(min_val);
    }
    this.head = result.head;
    return p(this);
  }

  ins_sort() {
    var p_first = new Node(undefined, this.head);
    var n = p_first.next;
    var n_index = 0;
    while (n) {
      var iter = p_first;
      var changed = false;
      for (var i = 0; i < n_index; i++) {
        if (iter && iter.next && ((iter.next.value == undefined)?"":iter.next.value.toString()) > ((n.value == undefined)?"":n.value.toString())) {
          var tmp_n = n.next;
          var tmp_i = iter.next
          iter.next = n;
          n.next = tmp_i;
          var seeker = n;
          while (seeker.next != n) {
            seeker = seeker.next;
          }
          seeker.next = tmp_n;
          changed = true;
          break;
        }
        iter = iter.next;
      }
      n = p_first.next;
      for (var j = 0; j < n_index; j++) {
        n = n.next;
      }
      n_index++;
    }
    this.head = p_first.next;
    return p(this);
  }

  merge_sort() {
    var len = this.len();
    if (this.len() > 1) {
      var p_first = new Node(undefined,this.head);
      var n = p_first;
      for (var i = 0; i < (this.len()/2); i++) {
        n = n.next;
      }
      var list1 = new LinkedList(n.next);
      n.next = undefined;
      var list2 = new LinkedList(p_first.next);
      list1.merge_sort();
      list2.merge_sort();
      list1.merge(list2);
      this.head = list1.head;
    }
    return p(this);
  }

  merge(list2) {
    var result = new LinkedList();
    while (this.head != undefined && list2.head != undefined) {
      if (this.head.value > list2.head.value) {
        result.append(list2.head.value);
        list2.remove_index(0);
      } else {
        result.append(this.head.value);
        this.remove_index(0);
      }
    }
    while (this.head != undefined) {
      result.append(this.head.value);
      this.remove_index(0);
    }
    while (list2.head != undefined) {
      result.append(list2.head.value);
      list2.remove_index(0);
    }
    this.head = result.head;
    return p(this);
  }

  len() {
    var result = 0;
    var n = new Node(undefined,this.head);
    while (n.next) {
      result++;
      n = n.next;
    }
    return result;
  }

}

function build_linked_list(arr) {
  var p_first = new LinkedList();
  var n = p_first;
  for (var i=0;i<arr.length;i++) {
    n.next = new Node(arr[i]);
    n = n.next;
  }
  return new LinkedList(p_first.next);
}

function print_linked_list(list) {
  var result = "";
  if (!list) { return "undefined"; }
  var n = list.head;
  while (n) {
    result += n.value + "->";
    n = n.next;
  }
  return result + "undefined";
}

function test(name, expected, actual) {
  if (!(expected == actual)) {
    console.log("\x1b[31mTest " + name + " failed!\x1b[0m");
    console.log("Expected value " + expected + " didnt happen. You got: " + actual);
  }
}

function p(x) {
  return print_linked_list(x);
}

function b(x) {
  return build_linked_list(x);
}

//Node display test
test("node t1","1->2->3->undefined",new Node(1,new Node(2,new Node(3))).p());

//Display tests
test("display t1","1->2->3->undefined",p(b([1,2,3])));
test("display t2","1->undefined",p(b([1])));
test("display t3","undefined",p(b([])));
test("display t1","1->2->3->3->a->undefined",p(b([1,2,3,3,"a"])));

//Insert tests
test("insert t1","1->2->2.5->3->undefined",b([1,2,3]).insert(2,2.5));
test("insert t2","0->1->undefined",b([1]).insert(0,0));
test("insert t3","9->undefined",b([]).insert(0,9));
test("insert t4","1->2->3->3->a->undefined->undefined->7->undefined",b([1,2,3,3,"a"]).insert(7,7));
test("insert t5","undefined->undefined->undefined->3->undefined",b([]).insert(3,3));

//Remove index tests
test("remove_index t1","1->2->undefined",b([1,2,3]).remove_index(2));
test("remove_index t1.1","1->3->undefined",b([1,2,3]).remove_index(1));
test("remove_index t1.2","2->3->undefined",b([1,2,3]).remove_index(0));
test("remove_index t1.3","1->2->3->undefined",b([1,2,3]).remove_index(3));
test("remove_index t1.4","1->2->3->undefined",b([1,2,3]).remove_index(12));
test("remove_index t2","undefined",b([1]).remove_index(0));
test("remove_index t3","undefined",b([]).remove_index(0));
test("remove_index t4","1->2->3->3->undefined",b([1,2,3,3,"a"]).remove_index(4));

//Remove tests
test("remove t1","1->3->undefined",b([1,2,3]).remove(2));
test("remove t1.5","1->2->3->undefined",b([1,2,3]).remove(22));
test("remove t2","1->undefined",b([0,1]).remove(0));
test("remove t2.5","0->undefined",b([0,1]).remove(1));
test("remove t3","undefined",b([]).remove(9));
test("remove t4","1->2->3->a->undefined",b([1,2,3,3,"a"]).remove(3));
test("remove t4.5","1->2->3->3->undefined",b([1,2,3,3,"a"]).remove("a"));

//Append tests
test("append t1","1->2->3->4->undefined",b([1,2,3]).append(4));
test("append t1.1","1->2->3->undefined->undefined",b([1,2,3]).append());
test("append t2","4->undefined",b([]).append(4));
test("append t2.1","undefined->undefined",b([]).append());
test("append t3","1->2->undefined",b([1]).append(2));
test("append t3.1","1->undefined->undefined",b([1]).append());

//Sel sort tests
test("ss t1","1->2->3->4->5->undefined",b([5,1,4,2,3]).sel_sort());
test("ss t1.1","1->2->3->4->5->undefined",b([5,4,3,2,1]).sel_sort());
test("ss t1.2","1->2->3->4->5->undefined",b([1,2,3,4,5]).sel_sort());
test("ss t1.3","1->undefined",b([1]).sel_sort());
test("ss t1.4","undefined",b([]).sel_sort());
test("ss t2","1->1->3->3->5->undefined",b([1,5,3,1,3]).sel_sort());
test("ss t3","undefined",b([]).sel_sort());
var testss31 = b([]);testss31.append();testss31.append();
test("ss t3.1","undefined->undefined->undefined",testss31.sel_sort());
var testss32 = b([]);testss32.append();testss32.append(1);
test("ss t3.2","1->undefined->undefined",testss32.sel_sort());
test("ss t4","1->2->a->b->undefined",b(["a",1,"b",2]).sel_sort());
test("ss t4.1","1->2->a->b->undefined",b([1,2,"a","b"]).sel_sort());
test("ss t4.2","1->2->3->a->b->c->undefined",b(["a","b",1,2,3,"c"]).sel_sort());

//Ins sort tests
test("insort t1","1->2->3->undefined",b([2,1,3]).ins_sort());
test("insort t2","1->2->3->4->5->undefined",b([5,1,4,2,3]).ins_sort());

test("insort t1.1","1->2->3->4->5->undefined",b([5,4,3,2,1]).ins_sort());
test("insort t1.2","1->2->3->4->5->undefined",b([1,2,3,4,5]).ins_sort());
test("insort t2","1->1->3->3->5->undefined",b([1,5,3,1,3]).ins_sort());
test("insort t3","undefined",b([]).ins_sort());
var testss31 = b([]);testss31.append();testss31.append();
test("ss t3.1","undefined->undefined->undefined",testss31.ins_sort());
var testss31 = b([]);testss31.append();testss31.append(1);
test("ss t3.2","1->undefined->undefined",testss31.ins_sort());
test("insort t4","1->2->a->b->undefined",b(["a",1,"b",2]).ins_sort());
test("insort t4.1","1->2->a->b->undefined",b([1,2,"a","b"]).ins_sort());
test("insort t4.2","1->2->3->a->b->c->undefined",b(["a","b",1,2,3,"c"]).ins_sort());

//Merge tests
test("merge t1","1->2->3->4->undefined",b([1,2]).merge(b([3,4])));
test("merge t1.1","1->2->3->4->undefined",b([1,3]).merge(b([2,4])));
test("merge t1.2","1->2->3->4->undefined",b([1]).merge(b([2,3,4])));
test("merge t1.3","1->2->3->4->undefined",b([1,4]).merge(b([2,3])));
test("merge t2","1->1->2->2->undefined",b([1,2]).merge(b([1,2])));
test("merge t2.1","1->1->2->5->undefined",b([1,5]).merge(b([1,2])));
test("merge t2.2","1->2->undefined",b([1,2]).merge(b([])));

//Merge Sort tests
test("mergesort t1","1->2->3->4->5->6->undefined",b([1,2,3,4,5,6]).merge_sort());
test("mergesort t1","1->2->3->4->5->6->undefined",b([6,5,4,3,2,1]).merge_sort());
test("mergesort t1","1->2->3->4->5->6->undefined",b([4,1,5,2,6,3]).merge_sort());


//Length tests
test("length t1",4,b([1,2,3,4]).len());
test("length t2",1,b([1]).len());
test("length t1",0,b([]).len());

